# Number of req to send

REQ=50

# URL of load balancer
URL="http://localhost:42069"

# Loop for sending requests
for((i=1; i<=REQ; i++)); do
    curl $URL &
done


wait 
echo "All requests are sent to load balancer."