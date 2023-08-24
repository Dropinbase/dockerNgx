FROM dropinbase/angular:ng15

WORKDIR /dropinbase

COPY /vendor/dropinbase/dropinbase/installer/Dockerfile .
COPY /vendor/dropinbase/dropinbase/installer/docker-compose.yml .
COPY /vendor/dropinbase/dropinbase/installer/configs .
COPY /vendor/dropinbase/dropinbase/installer/files .

EXPOSE 80
EXPOSE 443