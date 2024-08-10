pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'sonjiseokk/sarr-front'
        DOCKER_HUB_CREDENTIALS_ID = 'dockerhub2'
        NETWORK_NAME = 'my-network'
        GITLAB_CREDENTIALS_ID = 'gitlab' // GitLab 인증 정보 ID
        GITHUB_CREDENTIALS_ID = 'github-token'
        
        GITHUB_BACKEND_REPO_URL = "github.com/ssafyhapy/freezetag-backend.git"
        GITHUB_FRONTEND_REPO_URL = "github.com/ssafyhapy/freezetag-frontend.git"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def app = docker.build("${DOCKER_HUB_REPO}:latest", ".")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_HUB_CREDENTIALS_ID}") {
                        def app = docker.image("${DOCKER_HUB_REPO}:latest")
                        app.push()
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: 'ubuntu', // Jenkins SSH 서버 설정 이름
                        transfers: [
                            sshTransfer(
                                sourceFiles: '', // 파일 전송이 필요 없으므로 빈 문자열
                                execCommand: """
                                    docker pull ${DOCKER_HUB_REPO}:latest
                                    docker stop front || true
                                    docker rm front || true
                                    docker ps --filter "publish=3000" --format "{{.ID}}" | xargs -r docker stop
                                    docker ps --filter "publish=3000" --format "{{.ID}}" | xargs -r docker rm
                                    docker run -d --name front --network ${NETWORK_NAME} -p 3000:3000 ${DOCKER_HUB_REPO}:latest
                                """,
                                remoteDirectory: '/home/ubuntu', // 원격 디렉토리
                                removePrefix: ''
                            )
                        ],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: true
                    )
                ])
            }
        }
        
        stage('Update GitLab Repository') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${GITLAB_CREDENTIALS_ID}", passwordVariable: 'GITLAB_PASSWORD', usernameVariable: 'GITLAB_USERNAME'),
                                 string(credentialsId: "${GITHUB_CREDENTIALS_ID}", variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        git config --global user.email "thswltjr11@gmail.com"
                        git config --global user.name "sonjiseokk"

                        # Clone GitLab repository
                        git clone https://${GITLAB_USERNAME}:${GITLAB_PASSWORD}@lab.ssafy.com/s11-webmobile1-sub2/S11P12C209.git
                        cd S11P12C209

                        # Install and initialize Git LFS
                        git lfs install

                        # Pull all LFS objects
                        git lfs pull

                        # Fetch all LFS files
                        git lfs fetch --all

                        # Add backend subtree (to ensure it remains updated)
                        git subtree pull --prefix=backend https://${GITHUB_TOKEN}@${GITHUB_BACKEND_REPO_URL} main

                        # Add frontend subtree
                        git subtree pull --prefix=frontend https://${GITHUB_TOKEN}@${GITHUB_FRONTEND_REPO_URL} main

                        # Set remote URL for GitLab
                        git remote set-url origin https://${GITLAB_USERNAME}:${GITLAB_PASSWORD}@lab.ssafy.com/s11-webmobile1-sub2/S11P12C209.git
                        
                        # Ensure there are changes to commit and force push
                        git add .
                        git commit -m "Update subtrees" || true

                        git lfs push --all origin main
                        git push --force origin main
                    '''
                }
            }
        }


    }

    post {
        always {
            cleanWs()
        }
    }
}
