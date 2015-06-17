var MV = {};
MV.bindInput = function(varName,value,selector){
	MV[varName] = value;
	MV['_'+varName] = value;
}

$.fn.extend({
	mvBind: function(varName,customFn){
		var selector = this.selector;

		if(!MV[varName]){
			Object.defineProperty(MV, varName, {
				get: function(){
					return this['_'+varName];
				},
				set: function(newValue){
					this['_'+varName] = newValue;
					$(selector).val(newValue);
					$(selector).html(newValue);
					if(customFn){
						customFn();
					}
				}
			});
		}

		$.each(this,function(){
			if(this.tagName === 'INPUT' || this.tagName === 'TEXTAREA'){
				this.addEventListener('keyup',function(e){
					if(e.ctrlKey != 1 && e.keyCode != 17){ // ignore if ctrl key is pressed to allow ctrl+a select all etc.
						MV.bindInput(varName,this.value,selector);
					}
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
