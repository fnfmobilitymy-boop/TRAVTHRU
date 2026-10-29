import sys,json,html
from html.parser import HTMLParser
config=json.loads(sys.stdin.read()); lang=config['lang']; copy=config['copy']; ms=config['ms']; root=config['basePath']; out=[]
def tr(s):
 key=s.strip(); value=copy.get(key,key) if lang!='zh' else key
 if lang=='ms':value=ms.get(value,value)
 return s[:len(s)-len(s.lstrip())]+value+s[len(s.rstrip()):]
class Parser(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=False);self.skip=0
 def handle_decl(self,d):out.append('<!'+d+'>')
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag in ['script','style']:self.skip+=1
  if tag=='option' and 'value' not in a:a['value']=''
  if tag=='html':a['lang']={'zh':'zh-CN','en':'en','ms':'ms'}[lang]
  for k,v in list(a.items()):
   if k in ['alt','title','placeholder','aria-label'] and v:a[k]=tr(v)
   if k in ['src','href','poster','data-src'] and v and v.startswith(('./favicon.ico','/favicon.ico','./favicon.png','/favicon.png','./assets/','./videos/','/videos/','./images/','./site.webmanifest','./robots','/images/','/site.webmanifest')):a[k]=root+v.removeprefix('./').lstrip('/')
  if tag=='option' and a.get('value')=='':a.pop('value');a['data-stable-option']='true'
  out.append('<'+tag+''.join(' '+k+('="'+html.escape(v,quote=True)+'"' if v is not None else '') for k,v in a.items())+'>')
 def handle_startendtag(self,t,a):
  self.handle_starttag(t,a)
  out[-1]=out[-1][:-1]+'/>'
 def handle_endtag(self,t):
  if t in ['script','style']:self.skip-=1
  out.append('</'+t+'>')
 def handle_data(self,d):out.append(d if self.skip else html.escape(tr(d),quote=False))
 def handle_entityref(self,n):out.append('&'+n+';')
 def handle_charref(self,n):out.append('&#'+n+';')
 def handle_comment(self,d):out.append('<!--'+d+'-->')
# Stable form identifiers must stay Chinese even when labels are localized.
import re
source=re.sub(r'<option>([^<]*)</option>',lambda m:'<option value="'+html.escape(html.unescape(m[1]),quote=True)+'">'+m[1]+'</option>',config['html'])
p=Parser();p.feed(source);sys.stdout.write(''.join(out))
