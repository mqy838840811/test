var getPromisify = (url, data, dataType) => {
  return new Promise((resolve, reject) => {
    $.get(url, data, (response, status, xhr) => {
      if (status === 'success') {
        resolve({ response, status, xhr })
      } else {
        const err = new Error('xhr error')
        err.target = xhr
        reject(err)
      }
    }, dataType)
  })
}

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
			var oHallData = {
				//'sap-client': sClient2,
				$filter: Formatting.onInit({ Bukrs: sCompanyCode }),
			};
			jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				useDefaultXhrHeader: false,
				url: this.common + 'YCBUSTSet',
				dataType: "json",
				async: true,
				data: oHallData,
				success: function (data) {
					console.log(data);
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
