alias .b='. ~/.bashrc'
alias c='clear'
alias ls='ls -F'
alias ll='ls -l'
alias g='git' # all git aliases in ~/.gitconfig. A couple more complex cross-function stuff in ~/.bashrc-includes/bashrc.git.sh
alias hg='history | grep'
alias less='less -r'
alias rmpyc='find . -type f -name "*.pyc" | xargs rm -f'
alias tsc='$(which tsc) --target ES2015'
alias prettyjson='python -m json.tool'
alias fixhostname='sudo scutil --set HostName "$(scutil --get ComputerName)"'
alias t="todo.sh"
alias catfvl="cat ~/Library/Logs/Fiery\ Verify/main.log"
alias tailfvl="tail -f ~/Library/Logs/Fiery\ Verify/main.log"
alias speedtest='curl -o /dev/null http://speedtest.wdc01.softlayer.com/downloads/test10.zip'
alias y=yarn

function echoerr() { (>&2 echo "$@"); }
# Jump back in history filtered by what's on the command line
bind '"\e[A":history-search-backward'
bind '"\e[B":history-search-forward'

# Application aliases
alias subl='/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl'
alias chrome-debug="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222"

# Mac aliases
alias showdotfiles='defaults write com.apple.finder AppleShowAllFiles YES; killall Finder /System/Library/CoreServices/Finder.app'
alias hidedotfiles='defaults write com.apple.finder AppleShowAllFiles NO; killall Finder /System/Library/CoreServices/Finder.app'

# Edit Bash Configs
alias editconfig="code ~/.bash_profile ~/.bashrc ~/.gitconfig ~/.bashlibs"
alias ec=editconfig

. ~/.bashlibs/gitspaces/gitspaces.sh
. ~/.bashlibs/cgbash/cgrc.sh
. ~/.bashlibs/fierydev/fierydevrc.sh

which asciinema > /dev/null 2>&1
[ $? -eq 0 ] && . ~/.bashlibs/asciinema/asciinema.sh

alias nvm-use='nvm use --delete-prefix'
export NVM_DIR="$HOME/.nvm"
npm config delete prefix
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm use --delete-prefix 12

sleep 1 ; clear # Git rid of all of the startup echoes


PATH="/Users/davidmay/perl5/bin${PATH:+:${PATH}}"; export PATH;
PERL5LIB="/Users/davidmay/perl5/lib/perl5${PERL5LIB:+:${PERL5LIB}}"; export PERL5LIB;
PERL_LOCAL_LIB_ROOT="/Users/davidmay/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT}}"; export PERL_LOCAL_LIB_ROOT;
PERL_MB_OPT="--install_base \"/Users/davidmay/perl5\""; export PERL_MB_OPT;
PERL_MM_OPT="INSTALL_BASE=/Users/davidmay/perl5"; export PERL_MM_OPT;
