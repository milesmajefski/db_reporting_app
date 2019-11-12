#!/usr/bin/env python


import sys
import glob
import time
import os
import sqlite3
import json
from flask import Flask, render_template, url_for, Response  # , redirect
app = Flask(__name__)
db_file = 'data/chinook.db'


@app.route("/")
def index():
    return render_template('index.html',
                           reports_url=url_for('all_reports'),
                           schema_url=url_for('view_schema'))


@app.route("/schema")
def view_schema():
    # return redirect('/static/schema/index.html')
    return render_template('view-schema.html',
                           reports_url=url_for('all_reports'),
                           home_url=url_for('index'))


@app.route('/reports')
def all_reports():
    reports = []
    rpt_files = glob.glob(f'./sql/*.sql')
    for rf in rpt_files:
        report_name = rf.replace('\\', '/').split('/')[-1].split('.')[0]
        with open(rf) as fh:
            query = fh.read()
        reports.append({'file': rf, 'query': query,
                        'url': url_for('sql_report', report_name=report_name),
                        'name': report_name})
    return render_template('reports.html', reports=json.dumps(reports),
                           home_url=url_for('index'),
                           schema_url=url_for('view_schema'))


@app.route('/reports/<report_name>')
def sql_report(report_name):
    db_conn = sqlite3.connect(db_file)
    c = db_conn.cursor()
    rpt_file = f'./sql/{report_name}.sql'

    try:
        with open(rpt_file) as fh:
            query = fh.read()
            query_timestamp = time.time()
            c.executescript(query)
        # c.execute(f'''SELECT * FROM {report_name.replace('-', '_')}''')
        c.execute(f'''SELECT * FROM temp.result''')
        data = c.fetchall()
    except sqlite3.Error as e:
        print(e, file=sys.stderr, flush=True)
        return Response(str(e))
    finally:
        db_conn.close()

    names = [description[0] for description in c.description]
    html_data = json.dumps({'columns': names, 'data': data})
    return render_template('report.html', name=report_name,
                           data=html_data, query=query,
                           reports_url=url_for('all_reports'),
                           timestamp=query_timestamp,
                           schema_url=url_for('view_schema'),
                           home_url=url_for('index'))


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
