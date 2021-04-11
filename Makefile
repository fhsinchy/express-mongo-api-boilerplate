start:
	docker-compose up --detach
build:
	docker-compose up --detach --build
seed:
	docker-compose exec api npm run seed
shell:
	docker-compose exec api bash
logs:
	docker-compose logs --follow api
test:
	docker-compose exec api npm run test
stop:
	docker-compose stop
destroy:
	docker-compose down --volume
list:
	docker-compose ps
lint:
	docker-compose exec api npm run lint