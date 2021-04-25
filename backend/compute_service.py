import subprocess

def process_image(image_id):
    subprocess.run(["./high_pass", "data/" + image_id + ".png", "data/p_" + image_id + ".png"], capture_output=False)

def check_image_processed(image_id):
    while True:
        try:
            with open('data/p_' + image_id + '.png', 'r') as file:
                file.close()
            break
        except Exception as e:
            continue
    return True


def clear_data(image_id):
    if "/" in image_id or '/' in image_id or '.' in image_id or len(image_id) != 8:
        return "Bad request"
    subprocess.run(["rm", "data/" + image_id + ".png"], capture_output=False)
    subprocess.run(["rm", "data/p_" + image_id + ".png"], capture_output=False)
    return "Job cleared"