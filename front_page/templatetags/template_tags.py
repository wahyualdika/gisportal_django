from django import template
import datetime

register = template.Library()

def update_variable(value,arg):
    data = arg
    return data

register.filter('update_variable', update_variable)
