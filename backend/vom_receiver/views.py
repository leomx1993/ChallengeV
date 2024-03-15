from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from .models import *
from . serializer import * 
from rest_framework.response import Response
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import React  # Importe o modelo VOM_POLICIES
import json
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize
import ast 


@csrf_exempt
def vom_node_data(request):
    response_dict = {}

    # Check if the request method is POST
    if request.method == 'POST':
        # Parse the JSON request body
        request_body = json.loads(request.body)
        node_string = request_body.get('node_string')

        # Create a new React object with the received policy string and save it to the database
        new_react_object = React(policy_string=node_string)
        new_react_object.save()

        response_dict['status'] = 'success'
        response_dict['message'] = 'Policy string saved successfully'
        return JsonResponse(response_dict)
    else:
        # Return a 405 Method Not Allowed error if the request is not POST
        response_dict['status'] = 'error'
        response_dict['message'] = 'Method Not Allowed'
        return JsonResponse(response_dict, status=405)

@csrf_exempt
def vom_execution_engine(request):
    response_dict = {}
    request_body = json.loads(request.body)

    # Check the request type
    if request.method == 'POST':

        # Store the values
        age = int(request_body.get('age'))  
        income = int(request_body.get('income'))  

        # Find the policy:
        policy = React.objects.first()
        policy_string = policy.policy_string

        # Parse the policy string
        policy_data = ast.literal_eval(policy_string)
        policy_condition = policy_data['node']['condition']

        # Evaluate the policy condition
        if 'Age' in policy_condition:
            policy_condition = policy_condition.replace('Age', str(age))
        if 'Income' in policy_condition:
            policy_condition = policy_condition.replace('Income', str(income))
        
        # Evaluate the policy condition and return the result
        if eval(policy_condition):
            result = True
        else:
            result = False

        # Return the result
        response_dict['status'] = 'success'
        response_dict['age'] = age
        response_dict['income'] = income
        response_dict['result'] = result
        response_dict['message'] = 'Server response ok'

        return JsonResponse(response_dict)
 
 
