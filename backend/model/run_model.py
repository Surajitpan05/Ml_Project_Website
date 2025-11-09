# -*- coding: utf-8 -*-
import pandas as pd
import json
import sys
import os

if len(sys.argv) < 2:
    print(json.dumps({"error": "No file path provided"}))
    sys.exit(1)

file_path = sys.argv[1]

try:
    # --- Detect and read file safely ---
    ext = os.path.splitext(file_path)[1].lower()
    try:
        if ext in [".csv", ".txt", ""]:
            df = pd.read_csv(file_path, encoding="utf-8", on_bad_lines="skip")
        elif ext in [".xlsx", ".xls"]:
            df = pd.read_excel(file_path)
        else:
            # Try as CSV fallback
            df = pd.read_csv(file_path, encoding="utf-8", on_bad_lines="skip")
    except Exception as e:
        raise ValueError(f"Unable to read file: {str(e)}")

    # --- Clean column names ---
    df.columns = (
        df.columns.astype(str)
        .str.strip()
        .str.lower()
        .str.replace(" ", "_")
        .str.replace("[^0-9a-zA-Z_]", "", regex=True)
    )

    # --- Find or create 'name' column ---
    name_cols = [c for c in df.columns if "name" in c]
    if name_cols:
        df.rename(columns={name_cols[0]: "name"}, inplace=True)
    else:
        df["name"] = None

    # Fill missing or empty names so all rows have a name
    df["name"] = df["name"].fillna("").astype(str).str.strip()
    df.loc[df["name"] == "", "name"] = [
        f"Unnamed_{i+1}" for i in range(len(df[df["name"] == ""]))
    ]

    # --- Find or create 'teamwork_preference' column ---
    pref_cols = [c for c in df.columns if "teamwork" in c or "preference" in c]
    if pref_cols:
        df.rename(columns={pref_cols[0]: "teamwork_preference"}, inplace=True)
    else:
        df["teamwork_preference"] = "Unknown"

    # --- Apply your rule: 1 → Solo, >1 → Group ---
    def convert_preference(val):
        try:
            num = float(val)
            if num == 1:
                return "Solo"
            elif num > 1:
                return "Group"
            else:
                return "Unknown"
        except Exception:
            s = str(val).strip().lower()
            if s in ["1", "solo"]:
                return "Solo"
            elif s.isdigit() and int(s) > 1:
                return "Group"
            elif s in ["group"]:
                return "Group"
            return "Unknown"

    df["teamwork_preference"] = df["teamwork_preference"].apply(convert_preference)

    # --- Prepare output ---
    students = [
        {"name": row["name"], "teamwork_preference": row["teamwork_preference"]}
        for _, row in df.iterrows()
    ]

    output = {
        "status": "success",
        "total_students": len(students),
        "students": students
    }

    print(json.dumps(output, ensure_ascii=False))
    sys.exit(0)

except Exception as e:
    print(json.dumps({"error": f"Processing failed: {str(e)}"}))
    sys.exit(1)
