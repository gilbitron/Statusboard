FROM php:7.0.3-apache

RUN apt-get update && apt-get install -y libmcrypt-dev
RUN docker-php-ext-install mcrypt mbstring tokenizer mysqli

RUN mkdir -p /var/www/html/public
COPY statusboard.conf /etc/apache2/conf-enabled/statusboard.conf
RUN a2enmod rewrite && service apache2 restart

RUN usermod -u 1000 www-data
