
var sparesInquiryId = 0;

$(document).ready(function () {

    $("#body_ddlCustomer").bind("change", function () {
        var RID = $("#body_ddlCustomer option:selected").attr("RID");
        var CTI = $("#body_ddlCustomer option:selected").attr("CTI");

        $("#body_ddlRegion").val(RID).trigger("change");
        $("#body_ddlCustomerType").val(CTI).trigger("change");
    });

    $("#body_ddlProduct").bind("change", function () {
        getModelByProduct();
    });

    $("#body_ddlModel").bind("change", function () {
        getModuleByModelandProduct();
    });


    $("#btnSave").bind("click", function () {
        if (validateDIV("divSparesInquiry")) {
            addSparesInquiry();
        }
    });

    $("#btnClear").bind("click", function () {
        ClearData();
    });

    if (getParameterByName("config") != null) {
        sparesInquiryId = getParameterByName("config");
        GetSparesInquiry();
    }
});

function getModelByProduct() {
    var URL = '../api/premier/secure/getModelByProduct?productId=' + $("#body_ddlProduct option:selected").val();
    var Type = 'GET';
    var DataType = 'json';

    ReadServer(URL, Type, null, DataType, true, "1");
}

function getModuleByModelandProduct() {
    var URL = '../api/premier/secure/getModuleByModelandProduct?modelId=' + $("#body_ddlModel option:selected").val() + '&productId=' + $("#body_ddlProduct option:selected").val();
    var Type = 'GET';
    var DataType = 'json';

    ReadServer(URL, Type, null, DataType, true, "2");
}

function addSparesInquiry() {

    var paras = {};

    paras.sparesInquiryId = sparesInquiryId;
    paras.inquiryThroughId = $("#body_ddlInquiryThrough option:selected").val();
    paras.customerId = $("#body_ddlCustomer option:selected").val();
    paras.regionId = $("#body_ddlRegion option:selected").val();
    paras.productId = $("#body_ddlProduct option:selected").val();
    paras.modelId = $("#body_ddlModel option:selected").val();
    paras.moduleId = $("#body_ddlModule option:selected").val();
    paras.itemPartId = $("#body_ddlItemPart option:selected").val();
    paras.itemDesc = $.trim($("#txtItemDesc").val());
    paras.quantity = $.trim($("#txtQuantity").val());
    paras.engineerId = $("#body_ddlPerson option:selected").val();
    paras.quotationRef = $.trim($("#txtQuotationRefNo").val());
    paras.quotationDate = $.trim($("#txtQuotationDate").val());
    paras.poRef = $.trim($("#txtPORefNo").val());
    paras.poStatus = $("#chkpostatus").is(":checked") ? 1 : 0;
    paras.soRef = $.trim($("#txtSORefNo").val());
    paras.soDate = $.trim($("#txtSODate").val());
    paras.paymentStatus = $("#chkpaystatus").is(":checked") ? 1 : 0;
    paras.paymentValue = $.trim($("#txtPayment").val());
    paras.dispatchStatus = $("#chkdispatch").is(":checked") ? 1 : 0;
    paras.dispatchDate = $.trim($("#txtDispatchDate").val());
    paras.duration = $.trim($("#txtDuration").val());

    var URL = '../api/premier/secure/addSparesInquiry';
    var Type = 'POST';
    var DataType = 'json';

    $("#btnSave").text("Processing").attr("disabled", "disabled");

    ReadServer(URL, Type, JSON.stringify(paras), DataType, true, "3");
}


function doSuccess(res, ref) {
    switch (ref) {
        case "1":
            $("#body_ddlModel").html("<option value='0'>Select Model</option>");
            $.each(res.LST, function () {
                $("#body_ddlModel").append("<option value='" + this.MID + "' >" + this.MNM + "</option>");
            });
            $("#body_ddlModule").html("<option value='0'>Select Module</option>");
            $("#body_ddlItem").html("<option value='0' ISI='0' IPI='0'>Select Item</option>");

            break;
        case "2":
            $("#body_ddlModule").html("<option value='0'>Select Module</option>");
            $.each(res.LST, function () {
                $("#body_ddlModule").append("<option value='" + this.MID + "' >" + this.MNM + "</option>");
            });
            $("#body_ddlItem").html("<option value='0' ISI='0' IPI='0'>Select Item</option>");

            break;
        case "3":
            showmsg(res.Message, (res.result ? "1" : "2"));

            $("#btnSave").text((sparesInquiryId == 0 ? "Save" : "Update")).removeAttr("disabled");

            if (res.result) {
                ClearData();
            }
            break;
        case "4":
            $.each(res.LST, function (idx, val) {
                
                $("#body_ddlInquiryThrough").val(val.ITI).trigger("change");
                $("#body_ddlCustomer").val(val.CID).trigger("change");
                $("#body_ddlRegion").val(val.RID).trigger("change");
                $("#body_ddlProduct").val(val.PID).trigger("change");
                setTimeout(function () { $("#body_ddlModel").val(val.MID).trigger("change"); }, 500);
                setTimeout(function () { $("#body_ddlModule").val(val.MUI).trigger("change"); }, 750);
                $("#body_ddlItemPart").val(val.IPI).trigger("change");
                $("#txtQuantity").val(val.QTY);
                $("#txtItemDesc").val(val.IDC);
                $("#body_ddlPerson").val(val.EID).trigger("change");

                $("#txtQuotationRefNo").val(val.QRF);
                $("#txtQuotationDate").val(val.QDT);
                $("#txtPORefNo").val(val.POR);
                $("#chkpostatus").attr("checked", (val.POS == "1" ? true : false));
                $("#txtSORefNo").val(val.SOR);
                $("#txtSODate").val(val.SDT);
                $("#chkpaystatus").attr("checked", (val.PTS == "1" ? true : false));
                $("#txtPayment").val(val.PVL);
                $("#chkdispatch").attr("checked", (val.DTS == "1" ? true : false));
                $("#txtDispatchDate").val(val.DDT);
                $("#txtDuration").val(val.DUR);
                

                $("#btnSave").text("Update");
                $("#btnClear").text("Cancel");
            });

            break;
    }
}

function ClearData() {
    if (getParameterByName("config") != null) {
        setTimeout(function () { window.location = "sparesstatus"; }, 500);
    }
    $("#divSparesInquiry").clearForm();
    $("#body_ddlInquiryThrough").focus();
    $("#btnSave").text("Save");
    $("#btnClear").text("Clear");   

    $("#chkpostatus").attr("checked",false);
    $("#chkpaystatus").attr("checked", false);
    $("#chkdispatch").attr("checked", false);
    sparesInquiryId = "0";
}


function GetSparesInquiry() {
    var URL = '../api/premier/secure/getSparesInquiry?sparesInquiryId=' + sparesInquiryId;
    var Type = 'GET';
    var DataType = 'json';

    ReadServer(URL, Type, null, DataType, true, "4");
}

