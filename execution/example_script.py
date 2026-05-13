import os
import sys

def main():
    """
    Example script to demonstrate the Execution Layer.
    This script simply checks for the existence of an environment variable.
    """
    print("--- Execution Layer Demo ---")
    
    # Simulate reading from env
    env_path = os.path.join(os.path.dirname(__file__), "..", "env", ".env")
    
    if os.path.exists(env_path):
        print(f"Found config at: {env_path}")
    else:
        print("No .env file found. Please create one based on env/.env.example")
    
    print("Layer 3 execution completed successfully.")

if __name__ == "__main__":
    main()
