FROM django

RUN mkdir /gisportal_django

ADD . /gisportal_django/

WORKDIR /gisportal_django

RUN pip install -r requirements.txt

CMD [ "python", "./manage.py runserver 0.0.0.0:8000" ]
