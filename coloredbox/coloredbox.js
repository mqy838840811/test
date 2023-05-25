var context =this;
(function() { 
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
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
						this._props = {};
			
			//获取营业厅
			var oParams = {    
				"appId":"app_000001",
				"processId": "processId",
				"processInstId":"processInstId",
				"taskId": "taskId",
				"title": "创建待办", 
				"description": "创建待办描述",
				"dueTime": "2022-04-08 10:23:45",
				"executorIds": ["10101186"],
				"participantIds":["10101186"],
				"appUrl":"https://www.baidu.com",
				"pcUrl":"https://www.bing.com",
				"onlyShowExecutor":false,
				"operatorId": "10101186"
			};
			jQuery.ajax({
				type: "POST",
				contentType: "application/json",
				headers: {
					"X-GW-AccessKey": 'OGJDK2bmuRQrijXILVop0p8YRxIDFNbF',
					"Content-Type": 'application/json'
					},
				url: 'https://rdfa-gateway.uat.ennew.com/icome-contact/todo/create',
				dataType: "json",
				async: true,
				data: JSON.stringify(oParams),
				success: function (data) {
					console.log(data);
					context.result = data;
					var eventonRequest = new Event("onRequest");
					context.dispatchEvent(eventonRequest);
					
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log(textStatus);
				},
			});
			console.log(3);
			
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}
		
		get result() {
			return context.result;
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
