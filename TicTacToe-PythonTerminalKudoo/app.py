import random

def print_board(board):
    for row in board:
        print(" | ".join(row))
        print("-" * 9)

def check_winner(board, player):
    # Kiểm tra các hàng và cột
    for i in range(3):
        if all(board[i][j] == player for j in range(3)):
            return True
        if all(board[j][i] == player for j in range(3)):
            return True
    # Kiểm tra đường chéo
    if all(board[i][i] == player for i in range(3)) or all(board[i][2 - i] == player for i in range(3)):
        return True
    return False

def is_board_full(board):
    return all(board[i][j] != " " for i in range(3) for j in range(3))

def get_empty_cells(board):
    return [(i, j) for i in range(3) for j in range(3) if board[i][j] == " "]

def minimax(board, depth, is_maximizing):
    if check_winner(board, "X"):
        return -10 + depth
    elif check_winner(board, "O"):
        return 10 - depth
    elif is_board_full(board):
        return 0

    if is_maximizing:
        best_score = -float('inf')
        for row, col in get_empty_cells(board):
            board[row][col] = "O"
            score = minimax(board, depth + 1, False)
            board[row][col] = " "
            best_score = max(best_score, score)
        return best_score
    else:
        best_score = float('inf')
        for row, col in get_empty_cells(board):
            board[row][col] = "X"
            score = minimax(board, depth + 1, True)
            board[row][col] = " "
            best_score = min(best_score, score)
        return best_score

def get_best_move(board):
    best_score = -float('inf')
    best_move = None
    for row, col in get_empty_cells(board):
        board[row][col] = "O"
        score = minimax(board, 0, False)
        board[row][col] = " "
        if score > best_score:
            best_score = score
            best_move = (row, col)
    return best_move

def main():
    board = [[" " for _ in range(3)] for _ in range(3)]
    players = ["X", "O"]
    turn = 0

    print("Chào mừng đến với Tic Tac Toe! của Kudoo! Phiên bản python!")
    print_board(board)

    while True:
        player = players[turn % 2]

        if player == "X":
            row = int(input(f"Người chơi {player}, chọn hàng 1-3: ")) - 1
            col = int(input(f"Người chơi {player}, chọn cột (1-3): ")) - 1
            if row < 0 or row > 2 or col < 0 or col > 2 or board[row][col] != " ":
                print("Sai. Vui lòng thử lại!")
                continue
        else:
            print("Máy tính đang trả lời...")
            row, col = get_best_move(board)

        board[row][col] = player
        print_board(board)

        if check_winner(board, player):
            print(f"Người chơi {player} đã thắng!")
            break
        elif is_board_full(board):
            print("Hòa!")
            break

        turn += 1

if __name__ == "__main__":
    main()
# code by kudoo!