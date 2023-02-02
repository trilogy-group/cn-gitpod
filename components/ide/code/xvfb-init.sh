# Copyright (c) 2022 Gitpod GmbH. All rights reserved.
# Licensed under the GNU Affero General Public License (AGPL).
# See License-AGPL.txt in the project root for license information.

XVFB=/usr/bin/Xvfb
XVFBARGS=":10 -ac -screen 0 1280x800x24 -nolisten tcp -dpi 96 +extension RANDR"
/sbin/start-stop-daemon --start --quiet --background --exec $XVFB -- $XVFBARGS