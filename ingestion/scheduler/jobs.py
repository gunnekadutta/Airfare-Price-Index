from apscheduler.schedulers.blocking import BlockingScheduler


def start_scheduler(job):
    scheduler = BlockingScheduler()

    scheduler.add_job(
        job,
        "interval",
        hours=6,
        id="fare_collection_job"
    )

    scheduler.start()
