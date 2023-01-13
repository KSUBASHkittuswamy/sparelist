from django.shortcuts import render, redirect
import requests
from django.contrib import messages
from django.conf import settings
# url imported from project settings
from api.models import product, modeldata, module
url = settings.URL

# create


def create(request):
    if request.method == "POST":
        enquirythrough = request.POST.get('txtThrough')
        customer = request.POST.get('txtCustomer')
        region = request.POST.get('txtRegion')
        itempart = request.POST.get('txtitempart')
        quantity = request.POST.get('txtQuantity')
        itemdescription = request.POST.get('txtItemDesc')
        personname = request.POST.get('textname')
        qrefno = request.POST.get('txtQuotationRefNo')
        qdate = request.POST.get('txtQuotationDate')
        porefno = request.POST.get('txtRefNo')
        postatus = request.POST.get('chkpostatus')
        sorefno = request.POST.get('txtSORefNo')
        sodate = request.POST.get('txtSODate')
        pstatus = request.POST.get('chkpaystatus')
        paymentvalue = request.POST.get('txtPayment')
        dstatus = request.POST.get('chkdispatch')
        ddate = request.POST.get('txtDispatchDate')
        duration = request.POST.get('txtDuration')
        product_id = request.POST.get('txtProduct')
        model_id = request.POST.get('txtModel')
        module_id = request.POST.get('txtModule')

        data = {
            'enquirythrough': enquirythrough,
            'customer': customer,
            'region': region,
            'itempart': itempart,
            'quantity': quantity,
            'itemdescription': itemdescription,
            'personname': personname,
            'qrefno': qrefno,
            'qdate': qdate,
            'porefno': porefno,
            'postatus': postatus,
            'sorefno': sorefno,
            'sodate': sodate,
            'pstatus': pstatus,
            'paymentvalue': paymentvalue,
            'dstatus': dstatus,
            'ddate': ddate,
            'duration': duration,
            'product_id': product_id,
            'model_id': model_id,
            'module_id': module_id
        }
        print(data)

        response = requests.post('{url}views/'.format(url=url), data=data)
        print(response.text)
        res = response.json()
        context = {}

        if response.status_code == 201:
            context['s'] = "created successfully"
        else:
            error = res
            context['ERROR'] = error
            pass
        response1 = requests.get('{url}createnested/'.format(url=url)).json()
        response2 = requests.get('{url}product/'.format(url=url)).json()
        response3 = requests.get('{url}modeldataupdate/'.format(url=url)).json()
        response4 = requests.get('{url}moduleupdate/'.format(url=url)).json()
        context['response1'] = response1
        context['response2'] = response2
        context['response3'] = response3
        context['response3'] = response3
        context['sdata'] = data
        # print(context)
        # messages.success(request, ('details added successfully'))

        return render(request, "home.html",context=context)

    response1 = requests.get('{url}createnested/'.format(url=url)).json()
    response2 = requests.get('{url}product/'.format(url=url)).json()
    response3 = requests.get('{url}modeldataupdate/'.format(url=url)).json()
    response4 = requests.get('{url}moduleupdate/'.format(url=url)).json()

    return render(request, "home.html", {'response1': response1, 'response2': response2, 'response3': response3, 'response4': response4})

# update


def update(request, id):
    if request.method == "POST":
        enquirythrough = request.POST.get('txtThrough')
        customer = request.POST.get('txtCustomer')
        region = request.POST.get('txtRegion')
        itempart = request.POST.get('txtitempart')
        quantity = request.POST.get('txtQuantity')
        itemdescription = request.POST.get('txtItemDesc')
        personname = request.POST.get('textname')
        qrefno = request.POST.get('txtQuotationRefNo')
        qdate = request.POST.get('txtQuotationDate')
        porefno = request.POST.get('txtRefNo')
        # postatus=request.POST.get('chkpostatus')
        postatus = request.POST.get('hiddenchkpostatus')
        sorefno = request.POST.get('txtSORefNo')
        sodate = request.POST.get('txtSODate')
        # pstatus=request.POST.get('chkpaystatus')
        pstatus = request.POST.get('hiddenchkpayment')
        paymentvalue = request.POST.get('txtPayment')
        # dstatus=request.POST.get('chkdispatch')
        dstatus = request.POST.get('hiddenchkdispatch')
        ddate = request.POST.get('txtDispatchDate')
        duration = request.POST.get('txtDuration')
        product_id = request.POST.get('txtProduct')
        model_id = request.POST.get('txtModel')
        module_id = request.POST.get('txtModule')

        data = {
            'enquirythrough': enquirythrough,
            'customer': customer,
            'region': region,
            'itempart': itempart,
            'quantity': quantity,
            'itemdescription': itemdescription,
            'personname': personname,
            'qrefno': qrefno,
            'qdate': qdate,
            'porefno': porefno,
            'postatus': postatus,
            'sorefno': sorefno,
            'sodate': sodate,
            'pstatus': pstatus,
            'paymentvalue': paymentvalue,
            'dstatus': dstatus,
            'ddate': ddate,
            'duration': duration,
            'product_id': product_id,
            'model_id': model_id,
            'module_id': module_id
        }
        print(data)
        print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        response1 = requests.put(
            '{url}views/{pk}/'.format(url=url, pk=id), data=data)
        messages.success(request, ('details updated successfully'))
        print(response1.text)

        return redirect('create')
    return render(request, 'home.html', {'response1': response1})

# delete


def destroy(request, id):
    response = requests.delete('{url}views/{pk}/'.format(url=url, pk=id))
    messages.success(request, ('details deleted successfully'))
    print(response)
    return redirect('create')
