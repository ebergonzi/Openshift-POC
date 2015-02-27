Ping http V1
============

Servicios para probar Openshift.

Aplicación: index.html 

Api:
    - /v1/ping/self  Produce { "msg": "pong!" } como respuesta del propio servicio.
    - /v1/ping/others Produce un json que contiene la respuesta y los tiempos de consulta al ping de los servicios de fondo.
