import pathlib
import sys
import os

app_name = sys.argv[1]
os.mkdir(f"./tests/test_{app_name}")
pathlib.Path(f"./tests/test_{app_name}/__init__.py").touch()
pathlib.Path(f"./tests/test_{app_name}/conftest.py").touch()
pathlib.Path(f"./tests/test_{app_name}/factories.py").touch()
pathlib.Path(f"./tests/test_{app_name}/e2e_tests.py").touch()
pathlib.Path(f"./tests/test_{app_name}/test_models.py").touch()
pathlib.Path(f"./tests/test_{app_name}/test_signals.py").touch()
pathlib.Path(f"./tests/test_{app_name}/test_serializers.py").touch()
pathlib.Path(f"./tests/test_{app_name}/test_utils.py").touch()
pathlib.Path(f"./tests/test_{app_name}/test_views.py").touch()
pathlib.Path(f"./tests/test_{app_name}/test_urls.py").touch()










