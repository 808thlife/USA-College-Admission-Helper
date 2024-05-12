import os
import csv

def load_data(filename):
    """
    Loads CSV data into a dictionary.
    """
    colleges = {}

    with open(filename, 'r') as f:
        dict_reader = csv.DictReader(f)

        #get header fieldnames from DictReader and store in list
        headers = dict_reader.fieldnames

        for row in dict_reader:

            colleges[row['Name']] = {
                #"name" : row["Name"],
                "Geography":row["Geography"],
                "AdmissionRate": round(100*float(row["AdmissionRate"])),
                "AverageCost":row["AverageCost"],
                "FundingModel":row["FundingModel"],
                "PredominantDegree": row["PredominantDegree"],
                "HighestDegree": row["HighestDegree"],
                "Region": row["Region"],
                "ACTMedian":row["ACTMedian"],
                "SATAverage":row["SATAverage"],
            }
    return colleges

colleges = load_data("college.csv")

def filter_colleges(geography=None, admission_rate=None, average_cost=None, funding_model=None, predominant_degree=None, highest_degree=None, region=None, act_median=None, sat_average=None):
    """
    Filter colleges based on given criteria.
    """
    filtered_colleges = []

    for college_name, college_info in colleges.items():
        # Check if college matches each provided criterion
        if (geography is None or college_info["Geography"] == geography) and \
           (admission_rate is None or college_info["AdmissionRate"] == admission_rate) and \
           (average_cost is None or int(college_info["AverageCost"]) < average_cost) and \
           (funding_model is None or college_info["FundingModel"] == funding_model) and \
           (predominant_degree is None or college_info["PredominantDegree"] == predominant_degree) and \
           (highest_degree is None or college_info["HighestDegree"] == highest_degree) and \
           (region is None or college_info["Region"] == region) and \
           (act_median is None or college_info["ACTMedian"] == act_median) and \
           (sat_average is None or college_info["SATAverage"] == sat_average):
               filtered_colleges.append((college_name, college_info))

    return filtered_colleges

# Example usage:
# filtered = filter_colleges(region='Southeast', funding_model="Private", average_cost= 20000)
# print(filtered)

def populate_rows(): # in order to pass it
    regions = set()
    geography = set()
    for college_name, college_info in colleges.items():
        regions.add(college_info["Region"])
        geography.add(college_info["Geography"])

    return [regions, geography]

