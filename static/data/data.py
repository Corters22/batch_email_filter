import pandas as pd

batch_email = pd.read_csv("batch_file.csv")

batch_email.to_json("../js/data.js", orient='records')