Ping http V1
============

Servicios para probar Openshift.

Son dos servicios que interoperan uno como cliente del otro
El servicio de fondo atiende en http://servidorX:7000/v1/ping
El servicio de frente atiende en http://servidorY:8000/v1/ping

El servicio de frente tiene codificado como debe llamar a los distintos
servicios de fondo.

TODO: Versión 1.1: Va a migrarse al framework express (nodejs).
