#!/usr/bin/env bash

echo "Running .bash_profile ..."

#=================================================================================================
# Git Branch Prompt
# [dmay.ahead* (+1)] $  # Branch is 1 commit ahead of remote branch (you should push)
# [dmay.behind (-1)] $  # Branch is 1 commit behind remote branch (you should pull)
# [dmay.even*] $        # Branch is up-to-date with remote branch
# [dmay.local (L)] $    # Local branch is not tracking remote upstream branch
#                       # This can happen if the remote has been deleted (via a merge request)
#                       # or if it's a new local branch whose upstream hasn't been config'd yet.
#
# The optional * after the branch indicates if there are commits on the branch that haven't
# been merged yet.
#=================================================================================================
function branchPrompt() {
	# Get current branch name
	name=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
	
	if [ $? -ne 0 ]; then echo ""; return; fi # Not in a git repo, display nothing

	# From: "* dmay.test          dddb557aa [origin/dmay.test: ahead 1] test git branch -vv"
 	# To:   "[origin/dmay.test: ahead 1"
	stat=$(git branch -vv | grep '^*' | cut -c 3- | awk '{ $1=$2=""; print $0 }' | sed -e 's/^[[:space:]]*//' | sed -e 's/\].*$//')
    if [ "x${stat:0:1}" != "x[" ]; then
    	stat=" (L)"
    else
		remote=$(echo $stat | awk '{ print $1 }')
		direction=$(echo $stat | awk '{ print $2 }')
		offset=$(echo $stat | awk '{ print $3 }')
		case $direction in
			ahead)  stat=" (+"$offset")" ;;
			behind) stat=" (-"$offset")" ;;
			*)      stat="" ;;
		esac
	fi

	echo "[$name$stat] "
}

case "$TERM" in
   dumb)
     PS1="\n\u@\h \w\n\$(branchPrompt)$ " ;;
   *)
     PS1="\[\e]2;\h \w\a\n\[\e[32m\]\u@\h \[\e[36m\w\]\e[0m\]\n\$(branchPrompt)$ "
esac
export PS1

[[ -s ~/.bashrc ]] && . ~/.bashrc
test -e "${HOME}/.iterm2_shell_integration.bash" && source "${HOME}/.iterm2_shell_integration.bash"

export PATH=$HOME/bin:/usr/local/sbin:/usr/local/bin:/usr/bin:/usr/local/apache-maven-3.x.y/bin:~/Library/Python/2.7/bin/:$PATH
