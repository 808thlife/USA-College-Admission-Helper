from django.shortcuts import render
from .utils import filter_colleges, populate_rows
# Create your views here.

def index(request):
    options = populate_rows()
    regions = options[0]
    geography = options[1] # geography means the city (size)
    context = {"regions": regions, "geography":geography}
    return render(request, "core/index.html", context)

