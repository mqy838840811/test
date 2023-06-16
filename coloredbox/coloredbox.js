var context;
(function () {
    let template = document.createElement("template");
    template.innerHTML = `
		<style>
		:host {
			border-radius: 25px;
			border-width: 4px;
			border-color: black;
			border-style: solid;
			display: block;
		} 
		</style> 
	`;

    class ColoredBox extends HTMLElement {
        constructor() {
            super();
            context = this;
            let shadowRoot = this.attachShadow({
                    mode: "open"
                });
            shadowRoot.appendChild(template.content.cloneNode(true));
            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.dispatchEvent(event);
            });
            this._props = {};
		this.params= {};
		this.result= {};
		this.params.icomeTodo = {};
        }

        
        
        getParamsIcomeTodo(property) {
            return this.params.icomeTodo[property];
        }
	setParamsIcomeTodo(paramsProperties) {
            this.params.icomeTodo = {
                ...this.params.icomeTodo,
                ...JSON.parse(paramsProperties)
            };
        }
	getResultIcomeTodo(resultKey) {
		var resultKeyValue;
		if(resultKey){
			resultKeyValue = this.result.icomeTodo[resultKey];
		}
		if(resultKeyValue){
			return resultKeyValue;
		}
            return JSON.stringify(this.result.icomeTodo);
        }
	getHttpResult(resultKey) {
		var resultKeyValue;
		if(resultKey){
			resultKeyValue = this.result[resultKey];
		}
		if(resultKeyValue){
			return resultKeyValue;
		}
            return JSON.stringify(this.result);
        }
		doGet(url,accessKey) {
			jQuery.ajax({
                type: "GET",
                contentType: "application/json",
                headers: {
                    "X-GW-AccessKey": accessKey,
                    "Content-Type": 'application/json'
                },
                url: url,
                dataType: "json",
                async: false,
                success: function (data) {
					console.log(data);
					context.result = data;
                    var eventOnRequestSuccess = new Event("onRequestSuccess");
                    context.dispatchEvent(eventOnRequestSuccess);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log('error:'+textStatus);
					context.result.code = -1;
                    var eventOnRequestError = new Event("onRequestError");
                    context.dispatchEvent(eventOnRequestError);
                },
            });
			return context.result.code;
        }
        doPost(url,accessKey) {
		var icomeTodoUrl = 'https://rdfa-gateway.uat.ennew.com/icome-contact/todo/create';
		if(url){
			icomeTodoUrl = url;
		}
            console.log(url);
            //获取营业厅
            var oParams = this.params.icomeTodo;
            jQuery.ajax({
                type: "POST",
                contentType: "application/json",
                headers: {
                    "X-GW-AccessKey": accessKey,
                    "Content-Type": 'application/json'
                },
                url: icomeTodoUrl,
                dataType: "json",
                async: false,
                data: JSON.stringify(oParams),
                success: function (data) {
			console.log(data);
					context.result.icomeTodo = data;
                    var eventOnRequestSuccess = new Event("onRequestSuccess");
                    context.dispatchEvent(eventOnRequestSuccess);
					
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log('error:'+textStatus);
					context.result.icomeTodo = {};
					context.result.icomeTodo.code = -1;
                    var eventOnRequestError = new Event("onRequestError");
                    context.dispatchEvent(eventOnRequestError);
                },
            });
			return context.result.icomeTodo.code;
        }
		
		
	onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = {
                ...this._props,
                ...changedProperties
            };
        }
        onCustomWidgetAfterUpdate(changedProperties) {
            if ("color" in changedProperties) {
                this.style["background-color"] = changedProperties["color"];
            }
            if ("opacity" in changedProperties) {
                this.style["opacity"] = changedProperties["opacity"];
            }
        }
    }

    customElements.define("com-sap-sample-coloredbox", ColoredBox);
})();
