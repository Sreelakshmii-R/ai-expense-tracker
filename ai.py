def predict_category(text):
    text = text.lower()

    if any(x in text for x in ["pizza", "food", "burger",'rice','idli','dosa','biriyani','chicken','kuzhimandhi','alfahm','cake','icecream']):
        return "Food"
    elif any(x in text for x in ["bus", "train", "taxi",'car','flight',]):
        return "Travel"
    elif any(x in text for x in ["rent", "room", "house"]):
        return "Rent"
    else:
        return "Other"

