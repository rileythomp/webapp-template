import sys

from bs4 import BeautifulSoup

playing_board_html = sys.stdin.read()

box_elements = BeautifulSoup(playing_board_html, 'html.parser').find_all(class_='box')

board_str = ''

for element in box_elements:
    box = element.get('class')
    assert len(box) > 1
    assert(box[1][:5] == 'group')
    box_group = box[1][5:]
    board_str += box_group

assert len(board_str) == 64

print(board_str)

