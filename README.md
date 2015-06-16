# jQueryMV
实现 input值、html值 以及 js变量 的全双向自动绑定。
jQuery Model View double-side bind plugin.

AngularJS的双向绑定理念非常不错，但是AngularJS这个库太庞大了，不但不易与其他js库共用，而且需要改动hmtl结构，对非新项目以及只需简单的双向绑定功能并不太适用。因此写了这个轻量级的基于jquery的plugin。

sample code:

    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
    	<meta charset="utf-8">
    	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    	<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=no">	
    </head>
    <body>
    
    
    <button id="setVar">setVar</button>
    <button id="showVar">showVar</button>
    <input class="foo">
    <input class="foo">
    <div class="foo"></div>
    
    <button id="setVar2">setVar</button>
    <button id="showVar2">showVar</button>
    <input class="foo2">
    <input class="foo2">
    <div class="foo2"></div>
    
    <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/1.11.3/jquery.min.js"></script>
    
    <script type="text/javascript">
    // jQueryMV
    
    var MV = {};
    MV.bindInput = function(varName,value,selector){
    	if(!MV[varName]){
    		Object.defineProperty(MV, varName, {
    			get: function(){
    				return this['_'+varName];
    			},
    			set: function(newValue){
    				this['_'+varName] = newValue;
    				$(selector).val(newValue);
    				$(selector).html(newValue);
    			}
    		});
    	}
    	MV[varName] = value;
    	MV['_'+varName] = value;
    }
    
    $.fn.extend({
    	mvBind: function(varName){
    		var selector = this.selector;
    		$.each(this,function(){
    			if(this.tagName === 'INPUT'){
    				this.addEventListener('keyup',function(){
    					MV.bindInput(varName,this.value,selector);
    				});
    				this.addEventListener('cut',function(){
    					var elem = this;
    					setTimeout(function(){
    						MV.bindInput(varName,elem.value,selector);
    					},4);
    				});
    				this.addEventListener('paste',function(){
    					var elem = this;
    					setTimeout(function(){
    						MV.bindInput(varName,elem.value,selector);
    					},4);
    				});
    			}
    		});
    	}
    });
    </script>
    
    <script type="text/javascript">
    //test
    
    	$('.foo').mvBind('va');
    	$('#setVar').click(function(){
    		MV.va = 1;
    	});
    	$('#showVar').click(function(){
    		console.log(MV.va);
    	});
    
    	$('.foo2').mvBind('va2');
    	$('#setVar2').click(function(){
    		MV.va2 = 2;
    	});
    	$('#showVar2').click(function(){
    		console.log(MV.va2);
    	});
    </script>
    
    </body>
    
    </html>
