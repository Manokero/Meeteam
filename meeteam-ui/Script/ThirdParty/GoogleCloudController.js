var GoogleCloudController = {
    NaturalLanguage : {
        Configuration : {
            "Key" : "AIzaSyCOpDbm_M82MMnkt3twRA2fUfvElw5GTIs"
        },
        Annotate : function (Text, success, error) {
           var Obj = this;
           $.ajax({
                method: 'POST',
                url: 'https://language.googleapis.com/v1beta2/documents:annotateText?'+$.param({"key" : Obj.Configuration.Key}),
                contentType: 'application/json',
                data: JSON.stringify({
                  "document": 
                  {
                    "content": Text,
                    "type": "PLAIN_TEXT"
                  },
                  "features": 
                  {
                    "extractEntities": true,
                    "extractSyntax": true,
                    "extractDocumentSentiment": true
                  }                
                }),
                processData: false,
                success: success || (x => x),
                error: error || (x => x)
            })
        }
    },
	Vision : {
		Configuration : {
			"Key" : "AIzaSyAttkbkp1-lNNjLWZ6XZHLH91oJTursQG4"
		},
		Anotate : function (Image, success, error) {
		   var Obj = this;
		   $.ajax({
                method: 'POST',
                url: 'https://vision.googleapis.com/v1/images:annotate?'+$.param({"key" : Obj.Configuration.Key}),
                contentType: 'application/json',
                data: JSON.stringify(
                {
                    "requests": [
                    {
                        "image": {
                            "source": {
                                "imageUri": Image
                            }
                        },
                        "features": [
                        {
                            "type": "LABEL_DETECTION"
                        }
                        ]
                    }
                    ]
                }),
                processData: false,
                success: success || (x => x),
                error: error || (x => x)
            })
		}
	},
	Translation : {
		Configuration : {
			"Key" : "AIzaSyAttkbkp1-lNNjLWZ6XZHLH91oJTursQG4"
		},
		Translate : function (text, success, error) {
		   var Obj = this;
		   $.ajax({
                method: 'POST',
                url: 'https://translation.googleapis.com/language/translate/v2?'+$.param({
                	"key" : Obj.Configuration.Key,
                	"q" : text,
                	"target" : "es",
                	"source" : "en"
                }),
                contentType: 'application/json',
                data: JSON.stringify({
                    "key" : Obj.Configuration.Key,
                    "q" : text,
                    "target" : "es",
                    "source" : "en"
                }),
                processData: false,
                success: success || (x => x),
                error: error || (x => x)
            })
		}
	}
}