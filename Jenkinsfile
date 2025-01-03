pipeline {
    
    agent any
    
    tools {
        nodejs 'node23'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checkout'
                git branch: 'devops', credentialsId: 'git-pat', url: 'https://github.com/kishanlalbj/password-manager.git'
            }
        }
        
        stage("Prepare") {
            steps {
                echo "installing deps"
                sh 'pwd'
                sh 'ls'
                sh 'npm install --prefix server'
                sh 'npm install --prefix client'
            }
        }
        
        stage("Build") {
            steps {
                echo "Building.."
                sh "docker build -t kishanlalbj/password-manager:latest ."
            }
        }
        
        stage("Deploy") {
            steps {
                echo "Deploying to registry"
                withCredentials([usernamePassword(credentialsId: 'docker-creds', passwordVariable: 'dockerPassword', usernameVariable: 'dockerUser')]) {
                        sh 'echo "$dockerPassword" | docker login -u "$dockerUser" --password-stdin'
                        sh 'docker push kishanlalbj/password-manager:latest'
                }       
            }
        }
    }
}
