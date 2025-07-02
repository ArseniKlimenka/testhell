ARG platform_version=latest
FROM registryru.adacta-fintech.ru/adinsure/mono/sas-nginx-webdav:${platform_version}

COPY ./docker/astra/os-release /usr/lib/os-release

COPY ./docker/certs/life-ca.crt /usr/share/ca-certificates/
RUN echo life-ca.crt >> /etc/ca-certificates.conf

COPY ./docker/certs/rgsl-ru.crt /usr/share/ca-certificates/
RUN echo rgsl-ru.crt >> /etc/ca-certificates.conf

RUN update-ca-certificates