# Use the Python and Node.js image
FROM nikolaik/python-nodejs:python3.9-nodejs16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the Python requirements file to the working directory
COPY requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port your app runs on (assuming it's 3000 for Nest.js)
EXPOSE 3000

# Command to start your server
CMD ["npm", "start"]
