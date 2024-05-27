"""empty message

Revision ID: 43e4adcff548
Revises: ff8e06c37e54
Create Date: 2024-05-09 20:51:29.908115

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '43e4adcff548'
down_revision: Union[str, None] = 'ff8e06c37e54'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
