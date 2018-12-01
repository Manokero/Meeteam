BengalaFramework.Register({
    "Name" : "Value Format Utility",
    "Author" : "Pablo Ferreira",
    "Description" : "Value & Input formatting addon.",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Util",
    "SignName" : "BengalaFramework.Util.ValueFormat",
    "Dependencies" : [],
    "Framework" : {"Version" : 1.0}
});

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

var ftInit = function () {
    $(".moneyFormat").inputmask({"alias":  "currency", prefix: 'RD$ '});
    $(".groupDecimalFormat").inputmask("numeric", {
        // numericInput: true,
        placeholder: '0',
        groupSeparator: ',',
        autoGroup: true
    });
    $(".timeFormat").inputmask("hh:mm");;
    $(".dateTimeFormat").inputmask({'alias' : 'date'});
    $(".dateFormat").inputmask({'alias' : 'date'});
    $(".emailFormat").inputmask({'alias' : 'email'});


    $(".percentFormat").inputmask({ mask: "(99)|(99.9{1,2})"}).blur(function(){
      var rg = /\,+\d/g; // regular expression for comma and number
      if(!rg.test(this.value)){ // check if value doesn't have any num after comma
        this.value = this.value.split(',')[0]; // then just split the value and
      }                                        // assign the index[0]
    });

    $(".phoneNumberFormat").inputmask({ "mask": "+[9][9][9]([9][9][9]) [9][9][9]-[9][9][9][9]" });
    $(".numberFormat").inputmask("numeric", {
        numericInput: true
    });
}
