from rest_framework import serializers
from .serializers import *
from .models import spares, product, modeldata, module

# module serializer


class moduleserializer(serializers.ModelSerializer):
    class Meta:
        model = module
        fields = ['module_id', 'module', 'model_id']

# modeldata serializer


class modeldataserializer(serializers.ModelSerializer):
    class Meta:
        model = modeldata
        fields = ['model_id', 'modelname', 'product_id']

# product serializer


class productserializer(serializers.ModelSerializer):
    class Meta:
        model = product
        fields = ['product_id', 'product']

# sparesserializer


class sparesserializer(serializers.ModelSerializer):

    class Meta:
     model = spares
     fields = ['id', 'enquirythrough', 'customer', 'region', 'itempart', 'quantity', 'itemdescription', 'personname', 'qrefno', 'qdate', 'porefno',
              'postatus', 'sorefno', 'sodate', 'pstatus', 'paymentvalue', 'dstatus', 'ddate', 'duration', 'product_id', 'model_id', 'module_id']


# post serializers
# sparepost
class sparespost(serializers.ModelSerializer):
    class Meta:
        model = spares
        fields = ['enquirythrough', 'customer', 'region', 'itempart', 'quantity', 'itemdescription', 'personname', 'qrefno', 'qdate', 'porefno',
                  'postatus', 'sorefno', 'sodate', 'pstatus', 'paymentvalue', 'dstatus', 'ddate', 'duration']

# product post
class productpost(serializers.ModelSerializer):
    class Meta:
        model = product
        fields = ['product_id', 'product']

# modeldata post
class modeldatapost(serializers.ModelSerializer):
    class Meta:
        model = modeldata
        fields = ['model_id', 'modelname', 'product_id']

# module post
class modulepost(serializers.ModelSerializer):
    class Meta:
        model = module
        fields = ['module_id', 'module','model_id']

# nested serializer
class nested(serializers.ModelSerializer):
    product_id = productserializer()
    model_id = modeldataserializer()
    module_id = moduleserializer()
    class Meta:
        model = spares
        fields = ['id', 'enquirythrough', 'customer', 'region', 'itempart', 'quantity', 'itemdescription', 'personname', 'qrefno', 'qdate', 'porefno',
                  'postatus', 'sorefno', 'sodate', 'pstatus', 'paymentvalue', 'dstatus', 'ddate', 'duration', 'product_id', 'model_id', 'module_id']
