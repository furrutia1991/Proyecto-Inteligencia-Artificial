from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.template.loader import get_template
from django.template import	Context
from datetime import datetime
from django.shortcuts import render_to_response
from models import *
from django.shortcuts import get_objects_or_404

def categoria(request, id_categoria):
	categorias = Categoria.objects.all()
	cat = get_objects_or_404(Categoria, pk = id_categoria)
	# cat = Categoria.objects.get(pk = id_categoria)
	enlaces = Enlace.objects.filter(categoria = cat)
	template = "index.html"
	return render_to_response(template,locals())

def minus(request, id_enlace ):
	enlace = Enlace.objects.get(pk=id_enlace)
	enlace.votos = enlace .votos - 1
	enlace.save()
	return HttpResponseRedirect("/")

def plus(request, id_enlace):
	enlace = Enlace.objects.get(pk=id_enlace)
	enlace.votos = enlace .votos + 1
	enlace.save()
	return HttpResponseRedirect("/")


def home(request):
	categorias = Categoria.objects.all()
	enlaces = Enlace.objects.all()
	template = "index.html"
	# diccionario = {"categorias": categorias,"enlaces": enlaces}
	return render_to_response(template,locals())

def hora_actual(request):
	# ahora = datetime.now()
	# t = get_template("hora.html")
	# c = Context({"hora": ahora})
	# html = t.render(c)
	# return HttpResponse(html)

	now = datetime.now()
	return render_to_response('hora.html',{'hora': now, "usuario": "culo" })


