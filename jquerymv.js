var MV = {};
MV.bindInput = function(varName,value,selector){
	MV[varName] = value;
	MV['_'+varName] = value;
}

$.fn.extend({
	mvBind: function(varName){
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
				}
			});
		}

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
