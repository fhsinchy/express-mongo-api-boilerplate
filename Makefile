start:
	docker-compose up --detach
build:
	docker-compose up --detach --build
seed:
	docker-compose exec api npm run seed
shell:
	docker-compose exec api bash
test:
	docker-compose exec api npm run test
stop:
	docker-compose stop
destroy:
	docker-compose down --volume
list:
	docker-compose ps