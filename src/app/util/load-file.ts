export function loadScript(url : string){
      //console.log('preparing to load...')
      let node = document.createElement('script');
      node.src = url;
      node.type = 'text/javascript';
      node.async = true;
      // node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
}   
