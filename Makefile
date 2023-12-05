# Specify default targets
TARGET ?= backend_server frontend_server

#Specify default action
ACTION ?= run

# Rule to run the specified targets

# Rule for backend_server
backend_server:
	$(MAKE) -C card_validator $(ACTION)

# Rule for frontend_server
frontend_server:
	$(MAKE) -C card_validator_client $(ACTION)

# Rule to run the specified targets
run: $(TARGET)

# Rule to perform the specified action on the specified targets
perform_action_on_targets:
	$(foreach t, $(TARGET), $(MAKE) $(t) &&) true

# Default target with default action
default:
	$(MAKE) perform_action_on_targets

restart: stop run
