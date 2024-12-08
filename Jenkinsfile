pipeline {
    
    agent any

    stages {
        stage('Clone') {
            steps {
                echo 'Checkout'
                git branch: 'devops', credentialsId: 'git-password-manager', url: 'https://github.com/kishanlalbj/password-manager'
            }
        }
        
        stage("Prepare") {
            steps {
                echo "installing deps"
                bat 'npm install'
                bat 'npm install --prefix client'
            }
        }
        
        stage("Build") {
            steps {
                echo "Building.."
                bat "npm run build"
            }
        }
        
        stage("Static Code Analysis") {
            environment {
                scannerHome = tool 'SonarScannerLocal';
            }
            steps {
              withSonarQubeEnv(credentialsId: 'sonarqube-local', installationName: 'Sonar-Local') {
                bat "${scannerHome}/bin/sonar-scanner"
              }
            }
        }
    }
}
