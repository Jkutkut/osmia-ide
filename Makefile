OS	= $(shell uname -s)
ifeq ($(OS),Linux)
	CURRENT_PATH = $(shell pwd)
endif
ifeq ($(OS),Darwin)
	CURRENT_PATH = ${PWD}
endif

DIR_NAME = $(shell basename ${CURRENT_PATH})

FRONT_NAME = ${DIR_NAME}
PORT_FRONT = 600

DOCKER_CMD = docker run --rm -it
DOCKER_APP_V = -v ${CURRENT_PATH}/${FRONT_NAME}/:/${DIR_NAME} -w /${DIR_NAME}
DOCKER_IMG_FRONT = node:current-alpine3.16

usage:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  preInstall     Creates project"
	@echo "                   Opens a terminal in the container where you can setup the project with the installer \"./install.sh\""
	@echo "  install        npm install"
	@echo "  run_front      Runs the project in Docker"
	@echo "  terminal_front Opens a terminal inside a Docker container"
	@echo "  qr             Shows the QR code to access the project from a mobile device"

preInstall:
	docker run --rm -it -v ${CURRENT_PATH}:/${DIR_NAME} -w /${DIR_NAME} --entrypoint="/bin/sh" node:current-alpine3.16
	sudo chown -R ${USER}:${USER} .

install:
	${DOCKER_CMD} ${DOCKER_APP_V} --name ${FRONT_NAME}_install --entrypoint=npm ${DOCKER_IMG_FRONT} install

run_front:
	$(DOCKER_CMD) --name ${FRONT_NAME} -p ${PORT_FRONT}:${PORT_FRONT} ${DOCKER_APP_V} --entrypoint=npm -e PORT=${PORT_FRONT} ${DOCKER_IMG_FRONT} run dev

test_front:
	$(DOCKER_CMD) --name ${FRONT_NAME}_test ${DOCKER_APP_V} --entrypoint=npm ${DOCKER_IMG_FRONT} run test

terminal_front:
	$(DOCKER_CMD) --name ${FRONT_NAME}_terminal ${DOCKER_APP_V} --entrypoint=/bin/sh ${DOCKER_IMG_FRONT}

qr:
	${DOCKER_CMD} jkutkut/py-qr ${shell hostname -I | awk '{print $$1}'}:${PORT_FRONT}
