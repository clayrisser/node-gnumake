PLATFORM := $(shell node -e "process.stdout.write(process.platform)")
ifeq ($(SHX),)
SHX := node_modules/.bin/shx
endif

ifeq ($(PLATFORM), win32)
	CAT := $(SHX) cat
	CHMOD := $(SHX) chmod
	CP := $(SHX) cp
	FALSE := $(SHX) false
	FIND := $(SHX) find
	GREP := $(SHX) grep
	LN := $(SHX) ln
	LS := $(SHX) ls
	MAKE = make
	MKDIRP := $(SHX) mkdir
	MV := $(SHX) mv
	NULL := nul
	PWD := $(SHX) pwd
	RM := $(SHX) rm
	SED := $(SHX) sed
	SHELL = cmd.exe
	TAIL := $(SHX) tail
	TOUCH := $(SHX) touch
	TRUE := $(SHX) true
else
	CAT := cat
	CHMOD := chmod
	CP := cp
	FALSE := false
	FIND := find
	GREP := grep -E
	LN := ln
	LS := ls
	MKDIRP := mkdir -p
	MV := mv
	NULL := /dev/null
	PWD := pwd
	RM := rm
	SED := sed
	TAIL := tail
	TOUCH := touch
	TRUE := true
endif

CD := cd
GIT := $(shell git --version >$(NULL) 2>&1 && echo git|| echo true)
NPM := $(shell pnpm --version >$(NULL) 2>&1 && echo pnpm|| (yarn --version >$(NULL) 2>&1 && echo yarn|| echo npm))

.EXPORT_ALL_VARIABLES:
