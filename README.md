# Breast Mammography Classification — Coursework Project

Classifies a single mammogram image finding as **benign** or **malignant**,
trained on the CBIS-DDSM dataset (Kaggle mirror).

## Files

- `breast_cancer_mammography_project.ipynb` — full notebook: dataset docs,
  data prep, model training, evaluation, and export (Parts A0–A8 of the brief).
- `streamlit_app.py` — the diagnostic portal (Part B of the brief).
- `requirements.txt` — pinned dependency versions.
- `breast_mammo_classifier.keras` — trained model file (produced by running the
  notebook; not included here until you run it).

## Before you start

1. Download the **CBIS-DDSM Breast Cancer Image Dataset** from Kaggle and
   unzip it somewhere on your machine.
2. Open the notebook and update the `DATA_DIR` variable in the setup cell to
   point at that unzipped folder.
3. Run the first cell that prints `os.listdir(DATA_DIR)` — use its output to
   confirm the CSV filenames and image-path resolution logic in section A2/A3
   match your actual download. Kaggle mirrors occasionally rename folders, so
   this step matters.

## Running the notebook

```bash
pip install -r requirements.txt
jupyter notebook breast_cancer_mammography_project.ipynb
```

Run all cells top to bottom. This will:
- Load and document the dataset (A1–A3)
- Train a ResNet50-based transfer learning model (A4–A5)
- Evaluate it with a confusion matrix and per-class metrics (A6)
- Save the trained model as `breast_mammo_classifier.keras` (A7)

## Running the Streamlit app

Make sure `breast_mammo_classifier.keras` (from the notebook) is in the same
folder as `streamlit_app.py`, then:

```bash
pip install -r requirements.txt
streamlit run streamlit_app.py
```

Open the local URL Streamlit prints (usually `http://localhost:8501`).

## Confirmed locally

- [ ] `pip install -r requirements.txt` succeeds on a clean environment
- [ ] Notebook runs top to bottom without errors after `DATA_DIR` is set
- [ ] Streamlit app loads the saved model and produces a real prediction on
      an uploaded image
