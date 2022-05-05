pipeline {
    agent none
    environment {
       TELEGRAM_CHAT_ID = "-607951263"
       SHORTCOMMIT=""
   }
    options {
        buildDiscarder(logRotator(numToKeepStr: '30'))
        timeout(time: 1, unit: 'HOURS')
        timestamps()
        gitLabConnection('default')
    }
    triggers {
        gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
    }

    stages {
        stage('Deploy') {
                agent { node 'identix' }
                    steps {
                        gitlabCommitStatus(name: "${STAGE_NAME}",builds: [[projectId: 'identix.space/identix-pass-service', revisionHash: "${env.BRANCH_NAME}"],]){}
                        running("${STAGE_NAME}")
                        script {
                          SHORTCOMMIT=sh(returnStdout: true, script: "git log -n 1 --pretty=format:'subject:%s, short hash: %h, author: is %an'").trim()
                        }
                        sh('''#!/bin/bash
                          echo Branch Name: $BRANCH_NAME
                          cd /var/www/identix-pass/$BRANCH_NAME/backend
                          git pull
                          cd ../
                          docker-compose build
                        ''')
                    }
                post {
                   success {
                   success("${STAGE_NAME}")
                   }
                failure {
                   failure("${STAGE_NAME}")
                   }
                }
        }
        stage('Migration') {
                agent { node 'identix' }
                    steps {
                        gitlabCommitStatus(name: "${STAGE_NAME}",builds: [[projectId: 'identix.space/identix-pass-service', revisionHash: "${env.BRANCH_NAME}"],]){}
                        running("${STAGE_NAME}")
                        sh('''#!/bin/bash
                          echo Branch Name: $BRANCH_NAME
                          cd /var/www/identix-pass/$BRANCH_NAME
                          docker-compose run identix-pass-backend yarn typeorm:run 
                        ''')
                    }
                post {
                   success {
                   success("${STAGE_NAME}")
                   }
                failure {
                   failure("${STAGE_NAME}")
                   }
                }
        }
        stage('Update') {
                agent { node 'identix' }
                    steps {
                        gitlabCommitStatus(name: "${STAGE_NAME}",builds: [[projectId: 'identix.space/identix-pass-service', revisionHash: "${env.BRANCH_NAME}"],]){}
                        running("${STAGE_NAME}")
                          sh('''#!/bin/bash
                          echo Branch Name: $BRANCH_NAME
                          cd /var/www/identix-pass/$BRANCH_NAME
                          docker-compose up -d --force-recreate
                        ''')
                    }
                post {
                   success {
                   success("${STAGE_NAME}")
                   }
                failure {
                   failure("${STAGE_NAME}")
                   }
                }
        }

    }
    post { 
        success {
             node('master'){
                 withCredentials([string(credentialsId: 'TELEGRAM_BOT_ID', variable: 'TELEGRAM_BOT_ID'),
                                  string(credentialsId: 'TELEGRAM_BOT_TOKEN', variable: 'TELEGRAM_BOT_TOKEN')]) {
                    script {
                        String message = "Build #${currentBuild.number} ${SHORTCOMMIT} completed successful on identix-pass ${env.BRANCH_NAME}"
                        sendMessageToTelegramChanel(env.TELEGRAM_CHAT_ID, env.TELEGRAM_BOT_ID, env.TELEGRAM_BOT_TOKEN, message)
                    }
 
                }
             }    
        }
        failure {
            node('master'){
                withCredentials([string(credentialsId: 'TELEGRAM_BOT_ID', variable: 'TELEGRAM_BOT_ID'),
                                 string(credentialsId: 'TELEGRAM_BOT_TOKEN', variable: 'TELEGRAM_BOT_TOKEN')]) {
                    script {
                        String message = "Build #${currentBuild.number} ${SHORTCOMMIT} completed failure on identix-pass ${env.BRANCH_NAME}"
                        sendMessageToTelegramChanel(env.TELEGRAM_CHAT_ID, env.TELEGRAM_BOT_ID, env.TELEGRAM_BOT_TOKEN, message)
                 }
               } 
        }
      }
    }
}
def running(gitlabBuildName) {
    updateGitlabCommitStatus(name: "${gitlabBuildName}", state: 'running')
}

def success(gitlabBuildName) {
    updateGitlabCommitStatus(name: "${gitlabBuildName}", state: 'success')
}

def failure(gitlabBuildName) {
    updateGitlabCommitStatus(name: "${gitlabBuildName}", state: 'failed')
}
def sendMessageToTelegramChanel(chatId, botId, botToken, message) {
        message = java.net.URLEncoder.encode(message, "UTF-8")
        sh "curl -s --socks5-hostname 127.0.0.1:9050 -X POST https://api.telegram.org/bot${botId}:${botToken}/sendMessage -d chat_id=${chatId} -d text=${message}"
}
