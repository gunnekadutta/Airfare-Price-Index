from .ingestion_pipeline import run_ingestion
from .processing_pipeline import run_processing
from .index_pipeline import run_index_calculation


def run_pipeline():
    run_ingestion()
    run_processing()
    run_index_calculation()


if __name__ == "__main__":
    run_pipeline()
