"""Please only run this after creating a minimised JS file for a given
release.

Currently, the ideal time to run this would be after running `bumpversion`,
in order to match the 'packaged' js/css with the current version of the widget,
but that is a lot of commits, and technically the version tag will be behind
the packages.

For now, the usage is `python package.py <version>`
"""

import sys
from shutil import copy2


version = sys.argv[1]

base_css = 'src/hirmeos-metrics.css'
version_css = 'metrics-widget/hirmeos-metrics-{version}.css'.format(**locals())
copy2(base_css, version_css)

base_min_js = 'metrics-widget/hirmeos-metrics.min.js'
version_min_js = 'production/hirmeos-metrics-{version}.min.js'.format(
    **locals()
)
copy2(base_min_js, version_min_js)
