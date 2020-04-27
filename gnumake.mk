PLATFORM := $(shell node -e "process.stdout.write(process.platform)")

ifeq ($(PLATFORM), win32)
	CAT := shx cat
	CHMOD := shx chmod
	CP := shx cp
	FALSE := shx false
	FIND := shx find
	GREP := shx grep
	LN := shx ln
	LS := shx ls
	MAKE = make
	MKDIRP := shx mkdir
	MV := shx mv
	NULL := nul
	PWD := shx pwd
	RM := shx rm
	SED := shx sed
	SHELL = cmd.exe
	TAIL := shx tail
	TOUCH := shx touch
	TRUE := shx true
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
